//
//  UtilFunctions.m
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import "UtilFunctions.h"

@implementation UtilFunctions
+(UIImage *)findCorrespondingImageViewFrom:(NSString *)string {
    UIImage *image;
    if ([string isEqualToString:@"Electricity Bills"]) {
        image = [UIImage imageNamed:@"light_bulb"];
    } else if ([string isEqualToString:@"Overdue Bills"]) {
        image = [UIImage imageNamed:@"bills"];
    } else if ([string isEqualToString:@"Legal Fees"]) {
        image = [UIImage imageNamed:@"court"];
    } else if ([string isEqualToString:@"Medical Fees"]) {
        image = [UIImage imageNamed:@"medical"];
    } else if ([string isEqualToString:@"Educational Loans"]) {
        image = [UIImage imageNamed:@"education"];
    } else if ([string isEqualToString:@"Food Shortage"]) {
        image = [UIImage imageNamed:@"food"];
    }
    return image;
}

@end
