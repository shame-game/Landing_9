window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    let channelParam;
    let campaignParam;

    const matchBlogPost = window.location.href.match(/^https?:\/\/((www|merch)\.)?printify\.com\/blog\/.+/);

    const isShopifyReferral = document.referrer.match(/^https?:\/\/.+\.shopify\.com/);

    if (isShopifyReferral) {
        channelParam = "Shopify";
        campaignParam = "Referral";
    } else {
        channelParam = params.get("amcc_channel");
        campaignParam = params.get("amcc_campaign");
    }

    const gclid = params.get("gclid");
    if (gclid) {
        window.localStorage.setItem("gclid", gclid);
    }

    const campaignApplied = channelParam && campaignParam;
    if (campaignApplied || matchBlogPost) {
        const campaigns = JSON.parse(window.localStorage.getItem("amcc")) || [];
        const lastCampaign = campaigns[campaigns.length - 1];

        const lastCampaignDoesntMatchCurrentCampaign = lastCampaign && (
            lastCampaign.channel !== channelParam ||
            lastCampaign.campaign !== campaignParam
        );

        if (campaignApplied && (lastCampaignDoesntMatchCurrentCampaign || !lastCampaign)) {
            campaigns.push({
                channel: channelParam,
                campaign: campaignParam
            });
        };

        const slug = matchBlogPost
            ? window.location.pathname.replace(/^\/blog\//, "").replace(/\/$/, "")
            : null;
        if (slug) {
            const notTheSameAsLastBlogPost = lastCampaign && (
                lastCampaign.channel !== 'Blog' ||
                lastCampaign.campaign !== slug
            );

            if (notTheSameAsLastBlogPost || !lastCampaign) {
                campaigns.push({
                    channel: 'Blog',
                    campaign: slug
                });
            }
        }

        window.localStorage.setItem("amcc", JSON.stringify(campaigns));
    }
}
