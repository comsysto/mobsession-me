export class CopyService {
  constructor(private readonly localClipboard: Clipboard | undefined) {}

  copy(value: string): void {
    if (this.localClipboard) {
      // noinspection JSIgnoredPromiseFromCall
      this.localClipboard.writeText(value);
    }
  }
}
