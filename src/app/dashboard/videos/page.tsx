import { getReels } from '@/actions/dashboard/actions'
import { ReelTypeEnum } from '@/app/enums'
import { DashboardVideosTable } from '@/components/organisms'
import { mapReelOutputToReelTable } from '@/mappers/reel-output-to-reel-table.map'

export default async function VideosPage() {
	const params = {
		type: 'video'
	}

	const videos = await getReels(params)

	const mappedVideos = videos?.map(mapReelOutputToReelTable)

	return (
		<div className="min-h-[70vh]">
			<DashboardVideosTable reelType={ReelTypeEnum.video} videos={mappedVideos || []} />
		</div>
	)
}
