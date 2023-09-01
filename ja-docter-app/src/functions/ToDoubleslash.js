
/**
 * @returns convert "\n" "\\n"
 */
const ToDoubleslash = (str) => {
    return str.replace(/\n/g, '\\n');
}

export {ToDoubleslash}