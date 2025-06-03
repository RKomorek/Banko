"use client";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

interface DeleteTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTransactionModal({
  open,
  onClose,
  onConfirm,
}: DeleteTransactionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir transação</DialogTitle>
        </DialogHeader>
        <p >
          Tem certeza que deseja excluir esta transação?
        </p>
        <p className="text-sm text-muted-foreground">
          Essa ação não poderá ser desfeita.
        </p>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
