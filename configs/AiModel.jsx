/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Python Programming Fundamentals",\n    "description": "This course provides a comprehensive introduction to Python programming, covering fundamental concepts, data types, control flow, functions, and more. It is designed for beginners with no prior programming experience.",\n    "chapters": [\n      {\n        "name": "Introduction to Python",\n        "about": "This chapter covers the basics of Python, including its history, features, and how to set up your programming environment.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Variables and Data Types",\n        "about": "Learn about different data types in Python, including integers, floats, strings, and booleans. Understand how to declare and assign values to variables.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Operators and Expressions",\n        "about": "Explore different types of operators in Python, such as arithmetic, comparison, and logical operators. Learn how to construct expressions and evaluate them.",\n        "duration": "25 minutes"\n      },\n      {\n        "name": "Control Flow Statements",\n        "about": "Understand conditional statements (if-else) and looping structures (for and while loops) to control the flow of your Python programs.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Functions",\n        "about": "Learn how to define and call functions in Python to organize your code, improve reusability, and make it more readable.",\n        "duration": "20 minutes"\n      }\n    ]\n  },\n  "category": "Programming",\n  "topic": "Python",\n  "level": "Basic",\n  "duration": "1 hour",\n  "noOfChapters": 5\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail and topic: python, Chapter: Introduction to python, in JSON format with field as title, descripiton in detail, Code Example(HTML code format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Introduction to Python",\n  "description": "Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability and simplicity, making it a popular choice for beginners and experienced programmers alike. Here\'s an overview of the key concepts:",\n  "topics": [\n    {\n      "title": "Python\'s Strengths",\n      "description": "Python excels in various domains due to its versatility and powerful features:",\n      "points": [\n        "**Ease of Learning:** Python\'s syntax is clear and concise, resembling natural language, making it relatively easy to learn and understand.",\n        "**Beginner-Friendly:** The language\'s gentle learning curve allows beginners to grasp fundamental programming concepts without overwhelming complexity.",\n        "**Versatility:** Python can be used for diverse tasks, including web development, data science, machine learning, scripting, and more.",\n        "**Extensive Libraries:** Python boasts a vast collection of pre-built libraries, providing ready-to-use solutions for various tasks, saving developers time and effort.",\n        "**Large Community:** Python has a vibrant and supportive community, offering abundant resources, tutorials, and forums for help and collaboration."\n      ]\n    },\n    {\n      "title": "Python Interpreted Language",\n      "description": "Python is an interpreted language, meaning the code is executed line by line by an interpreter rather than being compiled into machine code beforehand. This allows for faster development and debugging.",\n      "codeExample": "<pre><code>\\n# Python code\\nprint(\'Hello, world!\')\\n</code></pre>"\n    },\n    {\n      "title": "Data Types",\n      "description": "Python supports various data types to represent different kinds of information:",\n      "points": [\n        "**Integers (int):** Whole numbers (e.g., 10, -5, 0)",\n        "**Floating-Point Numbers (float):** Numbers with decimal points (e.g., 3.14, -2.5)",\n        "**Strings (str):** Sequences of characters enclosed in single or double quotes (e.g., \'Hello\', \\"Python\\")",\n        "**Booleans (bool):** Represents truth values (True or False)",\n        "**Lists (list):** Ordered collections of items, mutable (changeable)",\n        "**Tuples (tuple):** Ordered collections of items, immutable (unchangeable)",\n        "**Dictionaries (dict):** Unordered collections of key-value pairs"\n      ]\n    },\n    {\n      "title": "Variables",\n      "description": "Variables are used to store and refer to data in your programs. Python uses a dynamic typing system, where you don\'t need to explicitly declare a variable\'s type.",\n      "codeExample": "<pre><code>\\n# Assign an integer to a variable\\nage = 25\\n\\n# Assign a string to a variable\\nname = \'Alice\'\\n\\n# Print the values\\nprint(age)\\nprint(name)\\n</code></pre>"\n    },\n    {\n      "title": "Operators",\n      "description": "Operators perform operations on data.",\n      "points": [\n        "**Arithmetic Operators:** (+, -, *, /, %, **, //)",\n        "**Comparison Operators:** (==, !=, >, <, >=, <=)",\n        "**Logical Operators:** (and, or, not)",\n        "**Assignment Operators:** (=, +=, -=, *=, /=, %=, //=, **=)",\n        "**Bitwise Operators:** (&, |, ^, ~, <<, >>)"\n      ]\n    },\n    {\n      "title": "Control Flow",\n      "description": "Control flow statements dictate the execution order of code.",\n      "points": [\n        "**Conditional Statements (if, elif, else):** Execute blocks of code based on conditions.",\n        "**Loops (for, while):** Repeat blocks of code a specific number of times or until a condition is met."\n      ]\n    },\n    {\n      "title": "Functions",\n      "description": "Functions are reusable blocks of code that perform specific tasks.",\n      "codeExample": "<pre><code>\\n# Define a function to greet a person\\ndef greet(name):\\n  print(\'Hello, \' + name + \'!\')\\n\\n# Call the function\\ngreet(\'Bob\')\\n</code></pre>"\n    },\n    {\n      "title": "Modules and Packages",\n      "description": "Modules are files containing Python code that can be imported and used in other programs. Packages are collections of related modules.",\n      "codeExample": "<pre><code>\\n# Import the math module\\nimport math\\n\\n# Calculate the square root of 25\\nresult = math.sqrt(25)\\n\\n# Print the result\\nprint(result)\\n</code></pre>"\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
