import type { Preview, StoryFn } from "@storybook/react";
import { StyleDecorator } from "@/shared/config/storybook/StyleDecorator/StyleDecorator";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        nextjs: {
            appDirectory: true,
        },
        decorators: [(Story: StoryFn) => StyleDecorator(Story)],
    },
};

export default preview;