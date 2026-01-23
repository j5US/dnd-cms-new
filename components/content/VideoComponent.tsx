import { CSSProperties } from 'react';

interface VideoComponentProps {
    url: string;
    width: number;
    height: number;
    controls: boolean;
    autoplay: boolean;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function VideoComponent({
    url,
    width,
    height,
    controls = true,
    autoplay = false,
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: VideoComponentProps) {

    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('v=')
                ? url.split('v=')[1]?.split('&')[0]
                : url.split('/').pop();
            return `https://www.youtube.com/embed/${videoId}?controls=${controls ? 1 : 0}&autoplay=${autoplay ? 1 : 0}`;
        }
        // Minimal support for other providers can be added here
        return url;
    };

    const style: CSSProperties = {
        width: '100%',
        maxWidth: `${width}px`,
        height: 'auto',
        aspectRatio: `${width}/${height}`,
        marginTop: `${marginTop * 4}px`,
        marginBottom: `${marginBottom * 4}px`,
        paddingTop: `${paddingTop * 4}px`,
        paddingBottom: `${paddingBottom * 4}px`,
        marginLeft: 'auto',
        marginRight: 'auto', // Center by default if container allows
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) {
        return (
            <div style={{ ...style, height: `${height}px`, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Invalid Video URL
            </div>
        );
    }

    return (
        <div style={style}>
            <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md shadow-sm"
            />
        </div>
    );
}
