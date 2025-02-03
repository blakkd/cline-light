import { VSCodeButton, VSCodeLink, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState, useCallback } from "react"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { validateApiConfiguration } from "../../utils/validate"
import { vscode } from "../../utils/vscode"
import ApiOptions from "../settings/ApiOptions"
import { useEvent } from "react-use"
import { ExtensionMessage } from "../../../../src/shared/ExtensionMessage"

const WelcomeView = () => {
	const { apiConfiguration } = useExtensionState()

	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)
	const [email, setEmail] = useState("")
	const [isSubscribed, setIsSubscribed] = useState(false)

	const disableLetsGoButton = apiErrorMessage != null

	const handleSubmit = () => {
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	const handleSubscribe = () => {
		if (email) {
			vscode.postMessage({ type: "subscribeEmail", text: email })
		}
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(apiConfiguration))
	}, [apiConfiguration])

	// Add message handler for subscription confirmation
	const handleMessage = useCallback((e: MessageEvent) => {
		const message: ExtensionMessage = e.data
		if (message.type === "emailSubscribed") {
			setIsSubscribed(true)
			setEmail("")
		}
	}, [])

	useEvent("message", handleMessage)

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}>
			<div
				style={{
					height: "100%",
					padding: "0 20px",
					overflow: "auto",
				}}>
				<h2>Hi, I'm Cline</h2>
				<div style={{ padding: "0 20px", flexShrink: 0 }}>
					<h2>What can I do for you?</h2>
					<p>
						Thanks to Claude's system prompt compression, locally loaded, and even reasoning models like{" "}
						<VSCodeLink
							href="https://huggingface.co/FuseAI/FuseO1-DeepSeekR1-QwQ-SkyT1-32B-Preview-GGUF"
							style={{ display: "inline" }}>
							FuseO1-DeepSeekR1-QwQ-SkyT1-32B-Preview-GGUF
						</VSCodeLink>
						can now fuel Cline too. Web scraping mode is only available for Claude. The tested quant level was Q4_K_M,
						and you can find more details on the original model creators' GGUF quants page:{" "}
						<VSCodeLink
							href="https://huggingface.co/FuseAI/FuseO1-DeepSeekR1-QwQ-SkyT1-32B-Preview-GGUF"
							style={{ display: "inline" }}>
							GGUF Quant Page
						</VSCodeLink>
						. Additionally,{" "}
						<VSCodeLink
							href="https://huggingface.co/FuseAI/FuseO1-DeepSeekR1-Qwen2.5-Coder-32B-Preview-GGUF"
							style={{ display: "inline" }}>
							FuseO1-DeepSeekR1-Qwen2.5-Coder-32B-Preview
						</VSCodeLink>
						scored a bit lower on the bench results and may not follow instructions as closely; That said, both models
						can be complementary.
					</p>
				</div>

				<p style={{ marginTop: "10px" }}>
					Local models like <strong>FuseO1-DeepSeekR1-QwQ-SkyT1-32B-Preview-GGUF</strong> (tested with Q4_K_M
					quantization) can be run directly on your machine. This model is available from{" "}
					<VSCodeLink href="https://huggingface.co/FuseAI/FuseO1-DeepSeekR1-QwQ-SkyT1-32B-Preview-GGUF">
						Hugging Face
					</VSCodeLink>
					and provides similar capabilities to Claude, with slight differences in output style between flash and coder
					versions.
				</p>

				<div
					style={{
						marginTop: "15px",
						padding: isSubscribed ? "5px 15px 5px 15px" : "12px",
						background: "var(--vscode-textBlockQuote-background)",
						borderRadius: "6px",
						fontSize: "0.9em",
					}}>
					{isSubscribed ? (
						<p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<span style={{ color: "var(--vscode-testing-iconPassed)", fontSize: "1.5em" }}>✓</span>
							Thanks for subscribing! We'll keep you updated on new features.
						</p>
					) : (
						<>
							<p style={{ margin: 0, marginBottom: "8px" }}>
								While Cline currently requires you bring your own API key, we are working on an official accounts
								system with additional capabilities. Subscribe to our mailing list to get updates!
							</p>
							<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
								<VSCodeTextField
									type="email"
									value={email}
									onInput={(e: any) => setEmail(e.target.value)}
									placeholder="Enter your email"
									style={{ flex: 1 }}
								/>
								<VSCodeButton appearance="secondary" onClick={handleSubscribe} disabled={!email}>
									Subscribe
								</VSCodeButton>
							</div>
						</>
					)}
				</div>

				<div style={{ marginTop: "15px" }}>
					<ApiOptions showModelOptions={false} />
					<VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} style={{ marginTop: "3px" }}>
						Let's go!
					</VSCodeButton>
				</div>
			</div>
		</div>
	)
}

export default WelcomeView
