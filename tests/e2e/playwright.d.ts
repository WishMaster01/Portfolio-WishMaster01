/* eslint-disable @typescript-eslint/no-explicit-any */
// Ambient type declarations for Playwright when running typecheck in environments without @playwright/test installed.
declare module "@playwright/test" {
  export interface Page {
    goto(url: string, options?: unknown): Promise<unknown>;
    getByRole(role: string, options?: unknown): any;
    getByPlaceholder(text: RegExp | string): any;
    locator(selector: string): any;
    [key: string]: any;
  }

  export interface APIRequestContext {
    get(url: string, options?: unknown): Promise<any>;
    post(url: string, options?: unknown): Promise<any>;
    [key: string]: any;
  }

  export interface TestContext {
    page: Page;
    request: APIRequestContext;
    [key: string]: any;
  }

  export const test: {
    (name: string, fn: (args: TestContext) => Promise<void> | void): void;
    describe(name: string, fn: () => void): void;
    [key: string]: any;
  };

  export const expect: any;
  export const devices: Record<string, any>;
  export function defineConfig(config: any): any;
}
