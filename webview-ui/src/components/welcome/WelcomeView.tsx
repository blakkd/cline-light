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
						This Cline fork only focuses on prompt compression, to make it usable on memory restricted environments.
						Locally loaded models like
						<VSCodeLink
							href="https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct-GGUF"
							style={{ display: "inline" }}>
							Qwen2.5-Coder-32B-Instruct
						</VSCodeLink>
						and
						<VSCodeLink
							href="https://huggingface.co/bartowski/Mistral-Small-24B-Instruct-2501-GGUF"
							style={{ display: "inline" }}>
							Mistral-Small-24B-Instruct
						</VSCodeLink>
						and even reasoning models like
						<VSCodeLink
							href="https://huggingface.co/collections/FuseAI/fuseo1-preview-678eb56093649b2688bc9977"
							style={{ display: "inline" }}>
							FuseO1's models*
						</VSCodeLink>
						can now power Cline too! But note web scraping mode is only available for Claude.
					</p>
					<p style={{ fontSize: "0.8em", margin: "5px 0 0" }}>
						{`* Recommended system prompt:
<br />
						<code>When replying, always format your reply with &lt;think&gt;{{Reasoning}}&lt;/think&gt;{Response}.</code>
						<br />
Match your effort to the task. And when it gets tough, take as long as you need to think before you start answering.`}
					</p>
				</div>
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
