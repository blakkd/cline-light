# Cline - AI Assistant for CLI and Editor

This fork focuses solely on compressing the system prompt to make Cline accessible to local inference. The prompt has been shorten as much as possible while preserving the original information.

With this lightened system prompt, locally loaded models such as:

- **[Qwen2.5-Coder-32B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct)** - Tested with Q4_K_M quantization - great quick coding tasks but not really at tool use
- **[Mistral-Small-24B-Instruct](https://huggingface.co/bartowski/Mistral-Small-24B-Instruct)** - Finetuned for tools use, making it a useful "Jarvis" assistant. Tested with Q5_K_L quantization
- **[Arcee-Blitz-24B](https://huggingface.co/arcee-ai/Arcee-Blitz)** - Should be even better than Mistral at tool use

Additionally, reasoning models like:

- **[FuseO1's models](https://huggingface.co/collections/FuseAI/fuseo1-preview-678eb56093649b2688bc9977)** - Tested with Q4_K_M quantization. Flash and coder variants can complement each other
- **[Mistral-Small-24B-Instruct-2501-reasoning](https://huggingface.co/yentinglin/Mistral-Small-24B-Instruct-2501-reasoning/)** - Not tested yet but might be good at tools use

can now power Cline too!

For more about Cline, visit their [repository](https://github.com/cline/cline).

PS: Note that the web scraping tool is only available for Claude.


## How to build

To build, please refer to https://github.com/cline/cline?tab=readme-ov-file#contributing