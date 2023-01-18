import { toast } from '@zerodevx/svelte-toast';

const SUCCESS_COLOR = 'var(--color-success)';
const SUCCESS_BAR_COLOR = 'var(--color-success-bar)';
const ERROR_COLOR = 'var(--color-error)';
const ERROR_BAR_COLOR = 'var(--color-error-bar)';
const WARNING_COLOR = 'var(--color-warning)';
const WARNING_BAR_COLOR = 'var(--color-warning-bar)';
const INFO_COLOR = 'var(--color-info)';
const INFO_BAR_COLOR = 'var(--color-info-bar)';

class NotificationCenter {
	displaySuccessNotification(msg: string) {
		toast.push(msg, {
			theme: {
				'--toastBackground': SUCCESS_COLOR,
				'--toastBarBackground': SUCCESS_BAR_COLOR
			}
		});
	}

	displayErrorNotification(msg: string) {
		toast.push(msg, {
			theme: {
				'--toastBackground': ERROR_COLOR,
				'--toastBarBackground': ERROR_BAR_COLOR
			}
		});
	}

	displayWarningNotification(msg: string) {
		toast.push(msg, {
			theme: {
				'--toastBackground': WARNING_COLOR,
				'--toastBarBackground': WARNING_BAR_COLOR
			}
		});
	}

	displayInfoNotification(msg: string) {
		toast.push(msg, {
			theme: {
				'--toastBackground': INFO_COLOR,
				'--toastBarBackground': INFO_BAR_COLOR
			}
		});
	}
}

export const notificationCenter = new NotificationCenter();
