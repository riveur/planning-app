import React from "react";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

type ModalDeleteScheduleProps = AlertDialogProps & {
  children?: React.ReactNode;
  eventId: string | null;
  onSuccess?: () => void;
  onError?: () => void;
};

export function ModalDeleteSchedule({
  children,
  eventId,
  onSuccess,
  onError,
  ...props
}: ModalDeleteScheduleProps) {

  const { toast } = useToast();

  const onConfirm = async () => {
    if (eventId === null) {
      toast({ description: 'Vous devez choisir une horaire', variant: 'destructive' });
      return;
    }

    await axios.delete(route('api.schedules.destroy', { schedule: eventId }))
      .then(() => {
        toast({ description: 'Horaire supprimée !' });
        onSuccess?.();
      })
      .catch(() => {
        toast({ description: 'Une erreur a survenue lors de la suppresion', variant: 'destructive' });
        onError?.();
      });
  };

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voulez-vous supprimer cette horaire ?</AlertDialogTitle>
          <AlertDialogDescription>
            Une fois que vous aurez confirmer, l'horaire sera définitivement supprimée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm()}>Confirmer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};