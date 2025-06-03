import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ITransaction } from "@/interfaces/transaction.interface";
import { CardPaymentMethod } from "./payment-method.component";

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: ITransaction;
  onSuccess?: () => void;
}

export function EditTransactionModal({
  open,
  onClose,
  transaction,
  onSuccess,
}: EditTransactionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-0 p-0">
        <CardPaymentMethod
          initialData={transaction}
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
