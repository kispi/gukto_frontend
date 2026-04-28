<script lang="ts">
	import { Search, Menu } from 'lucide-svelte'
</script>

<header
	class="g-header pointer-events-none absolute top-0 left-0 z-10 flex w-full items-center justify-between p-4"
>
	<div
		class="pointer-events-auto mx-auto flex w-full max-w-md items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg md:mx-0"
	>
		<Menu class="h-5 w-5 cursor-pointer text-slate-500 transition-colors hover:text-slate-900" />
		<div class="mx-2 h-6 w-px bg-slate-200"></div>
		<input
			type="text"
			placeholder="아파트, 지역, 지하철역 검색"
			class="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
		/>
		<button class="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600">
			<Search class="h-4 w-4" />
		</button>
	</div>
</header>
