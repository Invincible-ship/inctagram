import { VStack } from '@/shared/ui/Stack'

const NotFound = () => {
  return (
    <main>
      <VStack gap="36" align="center" max>
        <h2>404 - Profile with such id does not seem to exist...</h2>
        <iframe
          src="https://giphy.com/embed/FUKCPzVj0GGrCsdsmP"
          width="480"
          height="330"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </VStack>
    </main>
  )
}

export default NotFound
