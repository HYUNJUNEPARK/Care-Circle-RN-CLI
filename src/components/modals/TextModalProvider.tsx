import React, { createContext, type ReactNode, useCallback, useMemo, useState } from 'react';
import CustomTextModal from './CustomTextModal';

const ANIMATION_DURATION = 300; // ms

type ShowAlertParams = {
    title: string;
    message?: string | null;
    confirmText?: string | null;
    onConfirmAction?: () => void;
    cancelText?: string | null;
    onCancelAction?: () => void;
};

type TextModalContextValue = {
    showAlert: (params: ShowAlertParams) => void;
    closeAlert: () => void;
};

export const AlertContext = createContext<TextModalContextValue | undefined>(undefined);

const noop = () => {};

export function TextModalProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [confirmText, setConfirmText] = useState<string | null>(null);
    const [cancelText, setCancelText] = useState<string | null>(null);
    const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);
    const [onCancelAction, setOnCancelAction] = useState<(() => void) | null>(null);

    const closeAlert = useCallback(() => {
        setOpen(false);
        setTimeout(() => {
            setOnConfirmAction(null);
            setOnCancelAction(null);
        }, ANIMATION_DURATION);
    }, []);

    const showAlert = useCallback(({
        title,
        message = null,
        confirmText = '확인',
        onConfirmAction = noop,
        cancelText = '취소',
        onCancelAction = noop,
    }: ShowAlertParams) => {
        setTitle(title);
        setMessage(message);
        setConfirmText(confirmText);
        setCancelText(cancelText);
        setOnConfirmAction(() => onConfirmAction);
        setOnCancelAction(() => onCancelAction);
        setOpen(true);
    }, []);

    const handleClose = useCallback((callback: (() => void) | null) => {
        setOpen(false);
        setTimeout(() => {
            try {
                callback?.();
            } finally {
                setOnConfirmAction(null);
                setOnCancelAction(null);
            }
        }, ANIMATION_DURATION);
    }, []);

    const handleConfirm = useCallback(() => {
        handleClose(onConfirmAction);
    }, [handleClose, onConfirmAction]);

    const handleCancel = useCallback(() => {
        handleClose(onCancelAction);
    }, [handleClose, onCancelAction]);

    const contextValue = useMemo<TextModalContextValue>(() => ({
        showAlert,
        closeAlert,
    }), [showAlert, closeAlert]);

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            <CustomTextModal
                show={open}
                title={title}
                message={message}
                confirmText={confirmText ?? '확인'}
                cancelText={cancelText ?? '취소'}
                onConfirm={handleConfirm}
                onCancel={cancelText ? handleCancel : undefined}
            />
        </AlertContext.Provider>
    );
}