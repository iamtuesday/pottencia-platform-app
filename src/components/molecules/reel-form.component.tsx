'use client'

import { updateReel } from '@/actions/dashboard/actions'
import { ReelTypeEnum } from '@/app/enums'
import { Button } from '@/components/ui/button'
import { IReelResponse } from '@/interfaces'
import { ReelFormSchema, ReelFormSchemaType } from '@/schemas/reel-form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, Textarea } from '../ui'
import { TextField } from './text-field.component'

interface ReelFormProps {
	defaultValues?: Partial<IReelResponse>
	handleDialog?: () => void
}

export const ReelForm = ({ defaultValues, handleDialog }: ReelFormProps) => {
	const form = useForm<ReelFormSchemaType>({
		resolver: zodResolver(ReelFormSchema),
		defaultValues: {
			id: defaultValues?.id || '',
			url: defaultValues?.url || '',
			type: defaultValues?.type || ReelTypeEnum.video,
			description: defaultValues?.description || '',
			title: defaultValues?.title || ''
		},
		mode: 'onBlur'
	})

	const { handleSubmit, control, reset } = form

	const onSubmit = async (data: ReelFormSchemaType) => {
		await updateReel(data)
		reset()

		if (handleDialog) handleDialog()
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<TextField id="url" label="Url del video" control={control} name="url" placeholder="https://" />

				<TextField id="title" label="Titulo" control={control} name="title" placeholder="Titulo del video" />

				<TextField
					classNames={{
						field: 'max-h-[300px]'
					}}
					as={Textarea}
					id="description"
					label="Descripción"
					name="description"
					control={control}
					placeholder="https://"
				/>

				<footer>
					<Button className="mt-4 w-full tablet:w-max">Enviar</Button>
				</footer>
			</form>
		</Form>
	)
}