const fakeFileSystem = {
    "/": {
        bin: {}, boot: {}, dev: {}, etc: {}, home: {}, lib: {}, media: {},
        mnt: {}, opt: {}, proc: {}, root: {}, run: {}, sbin: {}, srv: {},
        sys: {}, tmp: {}, usr: {}, var: {}
    }
};

let currentPath = ["/", "home"]; // Start at `/home`

function getCurrentFolder() {
    return currentPath.reduce((folder, key) => folder[key], fakeFileSystem);
}

function resetFileSystem() {
    fakeFileSystem["/"].home = {}; // Reset `/home`
    currentPath = ["/", "home"];
}

const allowedCommands = {
    ls: () => {
        const folder = getCurrentFolder();
        const contents = Object.keys(folder);
        return contents.length > 0 ? contents.join("\n") : "(empty)";
    },
    pwd: () => currentPath.join("/").replace("//", "/"), // Clean up root path
    whoami: () => process.env.USERNAME || process.env.USER || "user",
    echo: (args) => args.join(" "),

    mkdir: (args) => {
        if (args.length === 0) return "Error: Missing directory name.";
        const folder = getCurrentFolder();
        if (folder[args[0]]) return "Error: Directory already exists.";
        folder[args[0]] = {}; // Create new folder
        return `Directory '${args[0]}' created.`;
    },

    rmdir: (args) => {
        if (args.length === 0) return "Error: Missing directory name.";
        const folder = getCurrentFolder();
        if (!folder[args[0]]) return "Error: Directory not found.";
        if (Object.keys(folder[args[0]]).length > 0) return "Error: Directory is not empty.";
        delete folder[args[0]];
        return `Directory '${args[0]}' removed.`;
    },

    touch: (args) => {
        if (args.length === 0) return "Error: Missing file name.";
        const folder = getCurrentFolder();
        if (folder[args[0]]) return "Error: File already exists.";
        folder[args[0]] = "fake-file";
        return `File '${args[0]}' created.`;
    },

    cat: (args) => {
        if (args.length === 0) return "Error: Missing file name.";
        const folder = getCurrentFolder();
        if (!folder[args[0]]) return "Error: File not found.";
        return folder[args[0]];
    },

    rm: (args) => {
        if (args.length === 0) return "Error: Missing file name.";
        const folder = getCurrentFolder();
        if (!folder[args[0]]) return "Error: File not found.";
        if (typeof folder[args[0]] === "object") return "Error: Cannot remove a directory with 'rm'. Use 'rmdir'.";
        delete folder[args[0]];
        return `File '${args[0]}' removed.`;
    },

    cd: (args) => {
        if (args.length === 0) return "Error: Missing directory name.";
        const target = args[0];

        if (target === "..") {
            if (currentPath.length > 1) {
                currentPath.pop();
                return `Moved to ${allowedCommands.pwd()}`;
            }
            return "Already at root `/`.";
        }

        const folder = getCurrentFolder();
        if (!folder[target] || typeof folder[target] !== "object") {
            return "Error: No such directory.";
        }

        if (currentPath.length === 1 && target !== "home") {
            return "Permission denied.";
        }

        currentPath.push(target);
        return `Moved to ${allowedCommands.pwd()}`;
    },

    reset: () => {
        resetFileSystem();
        return "File system reset. /home is now empty.";
    },

    uname: () => "Linux version 5.10.16 (fake-uname)",

    help: () => {
        return `
Available Commands:
---------------------------------------------
📂 File & Directory Management:
ls                List files in the current directory
pwd               Show the current directory path
mkdir &lt;dir&gt;       Create a new directory
rmdir &lt;dir&gt;       Remove an empty directory
touch &lt;file&gt;      Create a new file
rm &lt;file&gt;         Remove a file

📌 Navigation:
cd &lt;dir&gt;          Change directory
cd..              Go back one directory

🖥️ System Info:
whoami            Show the current user
uname             Show system information

📜 Utilities:
echo &lt;text&gt;       Print text to terminal
cat &lt;file&gt;        Display file contents

💡 Tip: Use 'cd home' to return to home anytime!
`;
    }
};

function getCommand(cmd, args) {
    return allowedCommands[cmd] ? allowedCommands[cmd](args) : null;
}

module.exports = { getCommand };
