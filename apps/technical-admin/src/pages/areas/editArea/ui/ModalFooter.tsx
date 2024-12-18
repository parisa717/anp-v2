import { Button } from 'primereact/button'

interface EditAreaModalFooterProps {
  onCancelClick: () => void
  onSaveClick: () => void
  onSkipAndSaveClick: () => void
  isUpdating: boolean
}

export const EditAreaModalFooter = ({
  onCancelClick,
  onSaveClick,
  onSkipAndSaveClick,
  isUpdating,
}: EditAreaModalFooterProps) => {

  return (
    <section className="flex gap-12 text-left">
      <div className="basis-1/3" />
      <div className="basis-2/3 flex justify-between items-center">
        <Button
          severity="secondary"
          outlined
          label={"Abbrechen"}
          onClick={onCancelClick}
          className="capitalize"
          disabled={isUpdating}
        />
        <div className="flex gap-2">
          <Button
            severity="secondary"
            outlined
            label={"Überspringen & speichern"}
            onClick={onSkipAndSaveClick}
            className="capitalize"
            disabled={isUpdating}
          />
          <Button label={"Weiter"} onClick={onSaveClick} autoFocus className="capitalize mr-0" disabled={isUpdating} />
        </div>
      </div>
    </section>
  )
}
