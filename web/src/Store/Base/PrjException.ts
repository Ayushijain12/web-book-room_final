export class PrjException {
	protected _code: number;
	protected _message: string;
	protected _status: number;

	constructor(code: number, message: string = '', status: number = 0) {
		this._code = code;
		this._message = message;
		this._status = status;
	}

	public get code(): number {
		return this._code
	}

	public get message(): string {
		return this._message;
	}

	public get status(): number {
		return this._status;
	}
}