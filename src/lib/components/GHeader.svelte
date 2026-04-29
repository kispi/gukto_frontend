<script lang="ts">
	import { Search, Menu, Bell, MessageSquare } from 'lucide-svelte'
	import { modal } from '$lib/modal/modal.svelte'
	import { toast } from '$lib/modal/toast.svelte'

	const testModal = async () => {
		const ok = await modal.confirm('정말로 진행하시겠습니까?', '확인 요청')
		if (ok) {
			toast.success('성공적으로 완료되었습니다.')
		} else {
			toast.info('취소되었습니다.')
		}
	}

	const testToast = () => {
		toast.info('새로운 알림이 있습니다.')
	}
</script>

<header
	class="g-header pointer-events-none absolute top-0 left-0 z-10 flex w-full items-center justify-between p-4"
>
	<div
		class="pointer-events-auto flex w-full max-w-md items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-lg md:mx-0"
	>
		<Menu class="h-5 w-5 cursor-pointer text-slate-500 transition-colors hover:text-slate-900" />
		<div class="mx-2 h-6 w-px bg-slate-200"></div>
		<input
			type="text"
			placeholder="아파트, 지역, 지하철역 검색"
			class="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
		/>
		<button class="btn-search">
			<Search class="h-4 w-4" />
		</button>
	</div>

	<div class="pointer-events-auto flex items-center gap-2">
		<button type="button" class="btn-icon" onclick={testToast}>
			<Bell size={20} />
		</button>
		<button type="button" class="btn-icon" onclick={testModal}>
			<MessageSquare size={20} />
		</button>
	</div>
</header>
