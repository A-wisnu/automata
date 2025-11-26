# Automata Diagram Generator

Web aplikasi untuk membuat diagram automata interaktif dengan analisis AI menggunakan Next.js dan Gemini API.

## Fitur

- 🎨 Generate diagram automata otomatis dari deskripsi
- 🤖 Analisis AI menggunakan Google Gemini
- 🖱️ Diagram interaktif dengan ReactFlow
- 📊 Visualisasi state dan transisi
- 💡 Penjelasan lengkap tentang automata

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser di [http://localhost:3000](http://localhost:3000)

## Cara Penggunaan

1. Masukkan nama program (contoh: "Sistem Login")
2. Jelaskan alur program secara detail
3. Klik "Generate Diagram"
4. Lihat diagram automata dan analisis AI

## Teknologi

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ReactFlow (untuk diagram)
- Google Gemini AI
- API Routes

## Struktur Project

```
├── app/
│   ├── api/generate/     # API endpoint untuk generate diagram
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── AIAnalysis.tsx    # Komponen analisis AI
│   ├── DiagramCanvas.tsx # Komponen diagram interaktif
│   └── InputForm.tsx     # Form input
└── .env.local            # Environment variables
```

## License

MIT
