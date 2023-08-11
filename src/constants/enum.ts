export enum VisitorType {
    VISITOR='Visitor',
    GENERAL='General'
}

export enum userType {
    EMPLOYEE='employee',
    SECURITY='security'
}

export enum Gender {
    MALE='Male',
    FEMALE='Female',
    OTHER='Other'
}

export enum VisitorStatus {
    PENDING='Pending',
    SIGNED_IN='SignedIn',
    SIGNED_OUT='SignedOut',
    REJECTED='Rejected',
    CANCELLED='Cancelled'
}

export enum MeetingStatus {
    PENDING='Pending',
    SIGNED_IN='SignedIn',
    SIGNED_OUT='SignedOut',
    REJECTED='Rejected',
    CANCELLED='Cancelled'
}

export enum ToastMessage {
    INVALID_CREDENTIALS='Invalid User Credentials',
    PROBLEM_LOGGING_IN='Problem logging you in. Sorry for the inconvenience',
    UPDATE_SUCCESSFUL='Meeting Updated Successfully',
    UPDATE_UNSUCCESSFUL='Error while updating a meeting',
    DELETE_SUCCESSFUL='Meeting Deleted Successfully',
    DELETE_UNSUCCESSFUL='Error while deleting a meeting',
    CREATION_SUCCESSFUL='Meeting Scheduled Successfully',
    CREATION_UNSUCCESSFUL='Error while scheduling a meeting',
}

export enum ConfirmationMessage {
    CONFIRM_DELETE='Are you sure want to delete this meeting?'
}