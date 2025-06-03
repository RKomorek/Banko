import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
        </DialogHeader>
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
