//
//  AtRisk.h
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Story.h"

@interface AtRisk : NSObject
@property (nonatomic, strong) NSSet * followers;
@property (nonatomic, strong) NSArray *stories;
@property (nonatomic, strong) NSString *desc;
@property (nonatomic, strong) NSString *fakeName;
@property (nonatomic, strong) NSString *_id;
@property (nonatomic, strong) NSNumber *createDate;
@end
