// Description: This component provides a skeleton loading state for the watch page, which includes a shimmer effect to indicate that content is being loaded.
// It consists of several div elements styled to look like loading placeholders for various sections of the watch page, such as the title, video player, and description area.
const WatchPageSkeleton = () => {
	return (
		// animate-pulse class adds a shimmering effect to the loading placeholders
		// Each div represents a different section of the watch page, with varying widths and heights to simulate the actual content layout
		<div className='animate-pulse'>
			<div className='bg-gray-700 rounded-md w-40 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-full h-96 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-3/4 h-6 mb-2 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-1/2 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-full h-24 shimmer'></div>
		</div>
	);
};

// export it to be used in the WatchPage component
export default WatchPageSkeleton;