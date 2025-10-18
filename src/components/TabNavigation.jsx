import { Box, Container, Flex, Tabs, Text } from '@radix-ui/themes';

const TabNavigation = ({ reviewsInfo, description, returnPolicy, qrCodeImg }) => {

	return (
		<Tabs.Root defaultValue="description" mt='2'>
			<Tabs.List>
				<Tabs.Trigger value="description">Description</Tabs.Trigger>
				<Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
				<Tabs.Trigger value="return-policy">Return Policy</Tabs.Trigger>
				<Tabs.Trigger value="barcode">BarCode</Tabs.Trigger>
			</Tabs.List>

			<Box pt="3">
				<Tabs.Content value="description">
					<Text size="2">{description ? description : "Make changes to your account."}</Text>
				</Tabs.Content>

				<Tabs.Content value="reviews">
					{!reviewsInfo && <Text size="2">Access and update your documents.</Text>}
					{reviewsInfo && (
						<>
							<h3 className='text-2xl font-bold my-2'>Reviews ({reviewsInfo.length})</h3>
							<Container>
								{reviewsInfo?.map((each_comment) => (
									<div key={each_comment.rating} className='w-full my-2 rounded-md bg-gray-200 dark:bg-slate-900 p-1'>
										<div className='flex items-center justify-between text-sm'>
											<div className='max-w-[20%]'>
												<b className='block text-xs my-0.5'>{new Date(each_comment.date).toLocaleDateString()}</b>
												<b className='text-pink-700'>{each_comment.reviewerName}</b>
											</div>
											<div className='w-fit bg-pink-500 rounded-lg p-0.5 px-1 text-white text-xs'>
												{each_comment.reviewerEmail}
											</div>
										</div>
										<div className='my-1'>
											{each_comment.comment}
										</div>
									</div>
								))}
							</Container>
						</>
					)}
				</Tabs.Content>

				<Tabs.Content value="return-policy">
					<Text size="2">{returnPolicy || "No return policy"}</Text>
				</Tabs.Content>

				<Tabs.Content value="barcode">
					<Text size="2">Scan the Barcode.</Text>
					<Flex align='center' justify='center' maxHeight='15rem' p='1'>
						<img src={qrCodeImg} alt="barcode" className='object-fill h-full rounded-md' />
					</Flex>
				</Tabs.Content>

			</Box>
		</Tabs.Root>

	)
}

export default TabNavigation;