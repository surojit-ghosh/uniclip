import Container from "@/components/container";
import DownloadSection from "@/components/download-section";
import FeaturesSection from "@/components/features-section";

export default function Home() {
    console.log(process.env.NEXT_PUBLIC_SERVER_URL);
    return (
        <Container clasName="font-inter flex-col flex pt-24 md:pt-28 items-center min-h-screen space-y-8 md:space-y-24">
            <div className="space-y-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    {/* <div className="dark:bg-primary/15 bg-primary/20 text-primary inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold">
                        ✨ 100% Free · No Signup Needed · Instant Access
                    </div> */}

                    <h1 className="text-center text-xl font-bold text-balance capitalize sm:text-5xl md:text-3xl">
                        Download & Trim Videos from YouTube, Instagram, X (Twitter), Facebook — all
                        in one tool.
                    </h1>

                    {/* <h2 className="text-muted-foreground md:text-md mx-auto text-center font-medium text-balance">
                        YouTube, Instagram, X (Twitter), Facebook — all in one tool.
                    </h2> */}
                </div>

                <DownloadSection />
            </div>

            <FeaturesSection />
        </Container>
    );
}
