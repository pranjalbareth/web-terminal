# 🐧 Kiwi - Web Terminal

Kiwi is a web-based Linux terminal emulator built with React.js and Node.js. It simulates a fake Linux terminal environment, allowing users to execute basic Linux commands directly from their browser. Whether you're a student, a beginner, or just someone who loves the Linux CLI, Kiwi provides an intuitive and interactive way to practice command & learn.

### 🌍 Live Demo
Try Kiwi Web Terminal live: [Kiwi Web Terminal](web-terminal-kiwi.vercel.app)

### 🎨 Features

Kiwi comes with several features designed to enhance the terminal experience:

- **Simulated Linux Commands**: Supports basic commands like `ls`, `cd`, `mkdir`, `rmdir`, `touch`, `rm`, `cat`, `pwd`, and more.
- **Filesystem Emulation**: A virtual file system with standard Linux directories (`/bin`, `/etc`, `/home`, etc.).
- **Themed & Interactive UI**: A visually appealing interface designed for ease of use.
- **Help Command**: Use `help` to get a structured, two-column list of available commands and their descriptions.

### 💻 Technologies Used

Kiwi is built using modern web technologies:

- **React.js** (Frontend)
- **Node.js** (Backend for command processing)
- **Local Storage** (To simulate persistent files and directories)
- **Styled Components** (For theming and styling)

### 🛠️ Commands Supported

Here are some of the basic commands supported in Kiwi:

```
help      - Show all available commands
ls        - List files in the current directory
pwd       - Show the current directory path
mkdir     - Create a new directory
rmdir     - Remove an empty directory
touch     - Create a new file
rm        - Remove a file
cd        - Change directory
whoami    - Show the current user
uname     - Show system information
echo      - Print text to terminal
cat       - Display file contents
reset     - Reset the file system
```

### 🤝 Contributing

We welcome contributions! To contribute, follow these steps:

1. Clone the repository:
   ```
   $ git clone https://github.com/yourusername/kiwi-web-terminal.git
   $ cd kiwi-web-terminal
   ```

2. Install dependencies for both frontend and backend:
   ```
   $ cd frontend && npm install
   $ cd ../backend && npm install
   ```

3. Start the frontend and backend separately:
   ```
   $ cd frontend && npm start
   ```
   In another terminal window:
   ```
   $ cd backend && npm start
   ```

4. Open the browser and start using Kiwi Web Terminal!

If you find a bug or want to improve Kiwi, feel free to open an issue or submit a pull request on GitHub. Let's make linux fun for everyone! 🚀

### 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

