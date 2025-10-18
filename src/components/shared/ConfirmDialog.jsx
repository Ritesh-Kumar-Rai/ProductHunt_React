import { AlertDialog, Button } from "@radix-ui/themes";

// A re-usable component for AlertDialog 
const ConfirmDialog = ({
    trigger,
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
}) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {trigger}
            </AlertDialog.Trigger>
            <AlertDialog.Content className="max-w-sm rounded-md p-6">
                <AlertDialog.Title className="text-lg font-semibold">{title}</AlertDialog.Title>
                <AlertDialog.Description className="text-sm text-gray-500 mt-2">{description}</AlertDialog.Description>
                <div className="flex justify-end gap-3 mt-6">
                    <AlertDialog.Cancel className="px-4 py-2 text-sm border rounded-md" asChild>
                        <Button variant="soft" color="gray">{cancelText}</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700" asChild>
                        <Button variant="solid" color="red">{confirmText}</Button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
};

export default ConfirmDialog;