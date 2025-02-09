# Cline - AI Assistant for CLI and Editor

This fork focuses solely on compressing the system prompt to make Cline accessible to local inference. The prompt has been shorten as much as possible while preserving the original information.

With this lightened system prompt, locally loaded models such as:

- **[Qwen2.5-Coder-32B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct)**: Tested with Q4_K_M quantization and offering good overall performance
- **[Mistral-Small-24B-Instruct](https://huggingface.co/bartowski/Mistral-Small-24B-Instruct)**: Finetuned for tools use, making it a useful "Jarvis" assistant. Tested with Q5_K_L quantization

Additionally, reasoning models like:

- **[FuseO1's models\*](https://huggingface.co/collections/FuseAI/fuseo1-preview-678eb56093649b2688bc9977)**: Tested with Q4_K_M quantization. Flash and coder variants can complement each other

can now power Cline too!

For more about Cline, visit their [repository](https://github.com/cline/cline).

PS: Note that web scraping is only available for Claude.

\* Recommended system prompt:

`When replying, always format your reply with <think>{Reasoning}</think>{Response}.
Match your effort to the task. And when it gets tough, take as long as you need to think before you start answering.`
