//
//  Story.h
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Story : NSObject
@property (nonatomic, strong) NSString *title;
@property (nonatomic, strong) NSString *text;
@property (nonatomic, strong) NSNumber *amountRaised;
@property (nonatomic, strong) NSNumber *amountNeeded;
@property (nonatomic, strong) NSNumber *dueDate;

@end
