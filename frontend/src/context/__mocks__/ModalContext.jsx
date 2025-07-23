export const mockRenderMainModal = jest.fn();
export const mockRenderInnerModal = jest.fn();
export const mockRenderFeedbackModal = jest.fn();
export const mockSetOnClose = jest.fn();

export const useModal = () => ({
    renderMainModal: mockRenderMainModal,
    renderInnerModal: mockRenderInnerModal,
    renderFeedbackModal: mockRenderFeedbackModal,
    setOnClose: mockSetOnClose,
})