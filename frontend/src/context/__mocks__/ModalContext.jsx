export const mockRenderMainModal = jest.fn();

export const useModal= () => ({
    renderMainModal: mockRenderMainModal,
})