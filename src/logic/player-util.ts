import {Colors} from "../constants/pieces-constants";

export function getPlayerColorFromGameInfo(userId: string, userIdWhite: string | null, userIdBlack: string | null) {
    switch (userId) {
        case userIdWhite: return Colors.WHITE
        case userIdBlack: return Colors.BLACK
        default:          return null
    }
}