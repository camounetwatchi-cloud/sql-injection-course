# SQL Injection Course

Interactive SQL Injection course with a real vulnerable demo site.

## 🎓 About

This project is an educational platform for learning SQL Injection attacks and defenses. It includes:

- **CryptoVault**: A fictional crypto portfolio site with intentional SQL vulnerabilities
- **Complete Course**: 6 modules covering theory, practice, and prevention
- **Hands-on Exercises**: Progressive challenges from easy to expert
- **CTF Challenge**: Capture the hidden FLAG!

## ⚠️ Warning

This site is **intentionally vulnerable** for educational purposes. Never:
- Enter real credentials
- Use these techniques on systems you don't own
- Deploy this to production without security measures

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (we use Neon)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/sql-injection-course.git
cd sql-injection-course
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local file with:
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

4. Initialize the database
```bash
# Start the dev server
npm run dev

# Visit http://localhost:3000/api/init-db to initialize the database
```

5. Start learning!
```bash
npm run dev
# Open http://localhost:3000/course
```

## 📚 Course Structure

1. **Module 1**: What is SQL Injection?
2. **Module 2**: How it works
3. **Module 3**: Technical stack
4. **Module 4**: Practical exercises
5. **Module 5**: How to protect
6. **Module 6**: Final CTF challenge

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS + Custom theme

## 📝 License

Educational use only. Do not use for malicious purposes.
