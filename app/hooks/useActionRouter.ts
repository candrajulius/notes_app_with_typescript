"use client";

import { message } from "antd";
import { useRouter } from "next/navigation";

type ActionRouterOptions = {
  successMessage?: string;
  errorMessage?: string;
  redirectTo?: string;
};

export function useActionRouter() {
  const router = useRouter();

  const onSuccess = (options?: ActionRouterOptions) => {
    if (options?.successMessage) {
      message.success(options.successMessage);
    }

    if (options?.redirectTo) {
      router.push(options.redirectTo);
    }
  };

  const onError = (err: unknown, options?: ActionRouterOptions) => {
    const msg =
      err instanceof Error
        ? err.message
        : options?.errorMessage || "Terjadi kesalahan";

    message.error(msg);
  };

  return {
    onSuccess,
    onError,
  };
}
