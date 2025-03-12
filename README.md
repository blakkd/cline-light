# Cline - AI Assistant for CLI and Editor

This fork focuses solely on compressing the system prompt to make Cline accessible to local inference.
The prompt has been condensed as much as possible while preserving the original functionalities.

Locally loaded models such as:

- **[Qwen2.5-Coder-32B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct)** - Great quick coding tasks but not so reliable at tool use
- **[Mistral-Small-24B-Instruct](https://huggingface.co/mistralai/Mistral-Small-24B-Instruct-2501)** - Finetuned for tools use, making it a useful "Jarvis" assistant
- **[Arcee-Blitz-24B](https://huggingface.co/arcee-ai/Arcee-Blitz)** - Should be even better than Mistral at tool use

and even reasoning models like **[QwQ](https://huggingface.co/Qwen/QwQ-32B)🤟** can now power Cline too!

For more about Cline, visit their [repository](https://github.com/cline/cline).

## How to build

To build, please refer to https://github.com/cline/cline?tab=readme-ov-file#contributing