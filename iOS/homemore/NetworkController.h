//
//  NetworkController.h
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RestKit/RestKit.h>


@interface NetworkController : NSObject

+ (id)sharedInstance;
- (void)configureRestKit;
- (void)tearDownRestKit;

@end
