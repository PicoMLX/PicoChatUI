//
//  File.swift
//  PicoChatUI
//
//  Created by Ronald Mannak on 7/15/25.
//

import Foundation
import Hummingbird
import JWTKit
import Logging
import NIOCore

public struct ChatRoutes {
    
    let responses = [
        "Oh freddled gruntbuggly,",
        "Thy micturations are to me, (with big yawning)",
        "As plurdled gabbleblotchits,",
        "On a lurgid bee,",
        "That mordiously hath blurted out,",
        "Its earted jurtles, grumbling",
        "Into a rancid festering confectious organ squealer. [drowned out by moaning and screaming]",
        "Now the jurpling slayjid agrocrustles,",
        "Are slurping hagrilly up the axlegrurts,",
        "And living glupules frart and stipulate,",
        "Like jowling meated liverslime,",
        "Groop, I implore thee, my foonting turlingdromes,",
        "And hooptiously drangle me,",
        "With crinkly bindlewurdles.",
        "Or else I shall rend thee in the gobberwarts with my blurglecruncheon,",
        "See if I don't!"
    ]
    
    /// Main entry point for registering all chat routes    
    public static func routes(
        router: Router<OllamaContext>,
    ) async {
        
        
    }
}
