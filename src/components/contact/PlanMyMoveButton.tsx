import { ContactActions } from "./ContactActions";
import { PlanMyMoveDialog } from "./PlanMyMove";

/**
 * Server wrapper around the client dialog.
 *
 * This is the component every page uses. It exists so that the contact list —
 * which is pure markup driven by build-time configuration — is rendered on the
 * server and passed into the client dialog as `children`, instead of being
 * imported by it and dragged into the browser bundle.
 *
 * The client half ships only the open/close handler.
 */
export function PlanMyMove({
  className,
  variant = "primary",
  size = "lg",
  label = "Plan my move",
}: {
  className?: string;
  variant?: "primary" | "onInk" | "bar";
  size?: "md" | "lg";
  label?: string;
}) {
  return (
    <PlanMyMoveDialog
      className={className}
      variant={variant}
      size={size}
      label={label}
    >
      <ContactActions />
    </PlanMyMoveDialog>
  );
}
