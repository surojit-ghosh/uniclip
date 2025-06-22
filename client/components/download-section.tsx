"use client";

import YouTubeForm from "@/components/form/youtube-form";
import { ExpandableTabs, Tab, useTabs } from "./ui/expandable-tabs";

const ComingSoonForm = () => (
    <div className="bg-muted/50 border-muted-foreground/30 rounded-lg border border-dashed p-6">
        <p className="text-muted-foreground text-sm font-medium">🚧 Coming Soon!</p>{" "}
        <p className="text-muted-foreground mt-2 text-xs">
            We&apos;re working hard to bring you the best downloading experience.
        </p>
    </div>
);

const tabs: Tab[] = [
    {
        icon: "/youtube.png",
        label: "YouTube",
        value: "youtube",
        form: <YouTubeForm />,
    },
    {
        icon: "/instagram.png",
        label: "Instagram",
        value: "instagram",
        form: <ComingSoonForm />,
    },
    {
        icon: "/facebook.png",
        label: "Facebook",
        value: "facebook",
        form: <ComingSoonForm />,
    },
    {
        icon: "/x.png",
        label: "X (Twitter)",
        value: "x",
        form: <ComingSoonForm />,
    },
];

const DownloadSection = () => {
    const { activeTab, setActiveTab } = useTabs(tabs[0].value);

    return (
        <div className="w-full">
            <ExpandableTabs tabs={tabs} {...{ activeTab, setActiveTab }} />

            <div className="bg-secondary mx-auto mt-6 w-full max-w-xl rounded-lg p-4 shadow-lg">
                {tabs.find((tab) => tab.value === activeTab)?.form}
            </div>
        </div>
    );
};

export default DownloadSection;
