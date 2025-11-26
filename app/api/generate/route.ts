import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
});

export async function POST(request: Request) {
  try {
    const { programName, flowDescription } = await request.json();

    const prompt = `Kamu adalah expert dalam teori automata dan finite state machine. 
Berdasarkan deskripsi program berikut:

Nama Program: ${programName}
Alur: ${flowDescription}

Buatlah:
1. Diagram automata dalam format JSON dengan struktur:
{
  "nodes": [
    {"id": "q0", "type": "automata", "data": {"label": "q0", "isInitial": true, "isFinal": false}, "position": {"x": 100, "y": 200}},
    {"id": "q1", "type": "automata", "data": {"label": "q1", "isFinal": false}, "position": {"x": 350, "y": 200}},
    {"id": "q2", "type": "automata", "data": {"label": "q2", "isFinal": true}, "position": {"x": 600, "y": 200}}
  ],
  "edges": [
    {"id": "e0-1", "source": "q0", "target": "q1", "label": "input", "type": "smoothstep"}
  ]
}

PENTING UNTUK LAYOUT:
- Gunakan type: "automata" untuk semua node
- State awal harus memiliki isInitial: true
- State akhir (accepting state) harus memiliki isFinal: true
- Gunakan label state seperti q0, q1, q2, dst (SINGKAT, maksimal 2-3 kata)
- LAYOUT: Atur posisi node dengan jarak LEBAR (minimal 250-350px horizontal, 200px vertikal)
- Buat layout yang MUDAH DIBACA: prioritaskan horizontal (kiri-kanan)
- Untuk alur yang kompleks, gunakan posisi yang bervariasi (tidak hanya lurus)
- Contoh posisi bagus: 
  * Node 1: x=150, y=250
  * Node 2: x=450, y=250  
  * Node 3: x=750, y=250
  * Jika ada cabang: x=450, y=100 atau y=400
- Hindari node yang terlalu berdekatan atau overlap
- Setiap node butuh ruang 100x100px, jadi beri jarak cukup!

2. Analisis dalam format object terstruktur dengan 5-tuple automata

PENTING: JANGAN gunakan simbol markdown seperti bintang ganda, bintang tunggal, pagar ganda, pagar tunggal, backtick, atau tilde dalam teks analisis. Tulis teks biasa saja tanpa formatting markdown.

Berikan response dalam format JSON PERSIS seperti ini:
{
  "diagram": {
    "nodes": [...],
    "edges": [...]
  },
  "analysis": {
    "Q": "Daftar semua state (contoh: {q0, q1, q2})",
    "Sigma": "Daftar alfabet input (contoh: {a, b, c})",
    "Delta": "Penjelasan fungsi transisi dalam format tabel atau daftar",
    "q0_initial_state": "State awal (contoh: q0)",
    "F_final_states": "Daftar state akhir (contoh: {q2})",
    "automata_type": "DFA/NFA/PDA",
    "explanation_of_work": "Penjelasan lengkap cara kerja automata",
    "complexity": "Analisis kompleksitas",
    "optimization_suggestions": "Saran optimasi jika ada"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const text = response.text;

    // Extract JSON from response and clean control characters
    const jsonMatch = text?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    // Remove control characters that break JSON parsing
    const cleanedJson = jsonMatch[0].replace(/[\x00-\x1F\x7F]/g, '');
    const data = JSON.parse(cleanedJson);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate diagram" },
      { status: 500 }
    );
  }
}
