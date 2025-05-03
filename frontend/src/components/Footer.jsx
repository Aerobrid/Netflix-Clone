// This component renders a footer for the Netflix clone application.
const Footer = () => {
	return (
		// The footer contains a message about the application and links to the GitHub repository
		// It uses Tailwind CSS for styling and responsive design
		// a tags are embedded within the p tag and used to link to the GitHub repository
		<footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				<p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
					Built by{" "}
					<a
						href='https://github.com/Aerobrid/Netflix-Clone'
						target='_blank'
						className='font-medium underline underline-offset-4'
					>
						Aerobrid
					</a>
					. The source code is available on{" "}
					<a
						href='https://github.com/Aerobrid/Netflix-Clone'
						target='_blank' 
						rel='noreferrer'
						className='font-medium underline underline-offset-4'
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
};

// Exporting the Footer component as the default export so it can be imported and used in other files
export default Footer;