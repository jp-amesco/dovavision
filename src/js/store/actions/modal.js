function toggleProfile(isOpen) {
    return {
        type: 'PROFILE',
        isOpen: isOpen
    }
}

export {
    toggleProfile
}