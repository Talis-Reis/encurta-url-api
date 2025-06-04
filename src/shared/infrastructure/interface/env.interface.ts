export abstract class IEnvConfig {
	abstract getPort(): number
	abstract getNodeEnv(): string
}
