import bt21vanSvg from '../assets/profile-pics/bt21-van.svg'
import cookySvg from '../assets/profile-pics/cooky.svg'
import darthvaderSvg from '../assets/profile-pics/darth-vader.svg'
import ironmanSvg from '../assets/profile-pics/iron-man.svg'
import jakeSvg from '../assets/profile-pics/jake.svg'
import koyaSvg from '../assets/profile-pics/koya.svg'
import pennywiseSvg from '../assets/profile-pics/pennywise.svg'
import screamSvg from '../assets/profile-pics/scream.svg'
import stitchSvg from '../assets/profile-pics/stich.svg'
import stormtrooperSvg from '../assets/profile-pics/stormtrooper.svg'
import supermarioSvg from '../assets/profile-pics/super-mario.svg'
import unknownImageProfile from '../assets/unknown-profilepic.png'


export const defaultProfileImage = unknownImageProfile

const profileImgMap: {[key: string]: string} = {
    'bt21van': bt21vanSvg,
    'cooky': cookySvg,
    'darthvader': darthvaderSvg,
    'ironman': ironmanSvg,
    'jake': jakeSvg,
    'koya': koyaSvg,
    'pennywise': pennywiseSvg,
    'scream': screamSvg,
    'stitch': stitchSvg,
    'stormtrooper': stormtrooperSvg,
    'supermario': supermarioSvg,
    'default': defaultProfileImage
}



export function profileImgsMapper(profileImg: string) {
    const foundImg = profileImgMap[profileImg]
    return typeof foundImg != 'undefined' ? foundImg : defaultProfileImage
}

export function getAllProfileImages() {
    return Object.entries(profileImgMap)
}