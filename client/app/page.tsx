import Container from "@/components/container";
import DownloadForm from "@/components/download-form";
import FeaturesSection from "@/components/features-section";

export default function Home() {
    return (
        <Container className="font-inter flex flex-col items-center space-y-8 pt-24 md:space-y-24 md:pt-28">
            <div className="space-y-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h1 className="text-center text-xl font-bold text-balance capitalize sm:text-5xl md:text-3xl">
                        Download & Trim Videos from YouTube, Instagram, X (Twitter), Facebook — all
                        in one tool.
                    </h1>
                </div>

                <div className="w-full">
                    <div className="bg-secondary mx-auto mt-6 w-full max-w-xl rounded-lg p-8 shadow-lg">
                        <DownloadForm />
                    </div>
                </div>
            </div>

            <FeaturesSection />
        </Container>
    );
}
