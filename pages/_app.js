import { AppProvider } from '../src/providers/AppProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<Component {...pageProps} />
		</AppProvider>
	);
}

export default MyApp;
