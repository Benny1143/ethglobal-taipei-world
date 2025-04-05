import { useState } from 'react';
import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'

type MiniAppWalletAuthSuccessPayload = {
	status: 'success'
	message: string
	signature: string
	address: string
	version: number
}

export const AuthBlock = () => {
	if (!MiniKit.isInstalled()) {
		return
	}

    const [nonce, setNonce] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchNonce = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_NEXTAUTH_URL}/nonce`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setNonce(data.nonce);

                const {commandPayload: generateMessageResult, finalPayload} = await MiniKit.commandsAsync.walletAuth({
                    nonce: data.nonce,
                    requestId: '0', // Optional
                    expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                    notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                    statement: 'This is my statement and here is a link https://worldcoin.com/apps',
                })

                console.log(MiniKit.walletAddress);
                console.log(generateMessageResult);
                console.log(finalPayload.status);
            } else {
                console.error('Failed to fetch nonce');
            }
        } catch (error) {
            console.error('Error fetching nonce:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchNonce} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Nonce'}
            </button>
            {nonce && <p>Nonce: {nonce}</p>}
        </div>
    );
};