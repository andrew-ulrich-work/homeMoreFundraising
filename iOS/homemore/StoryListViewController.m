//
//  StoryListViewController.m
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import "StoryListViewController.h"
#import "StoryOverviewTableViewCell.h"
#import "StoryDetailViewController.h"
#import <RestKit/RestKit.h>
#import "UtilFunctions.h"
#import "AtRisk.h"


@interface StoryListViewController () <UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (strong, nonatomic) NSArray * arrAtRisk;
@property (weak, nonatomic) IBOutlet UIButton *btnRefresh;

@end

@implementation StoryListViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;

    [self btnRefreshPressed:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(UIView *)tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section {
    return nil;
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    return nil;
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.arrAtRisk.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    StoryOverviewTableViewCell * cell = (StoryOverviewTableViewCell *) [tableView dequeueReusableCellWithIdentifier:@"StoryOverviewTableViewCell"];
    AtRisk * atRisk = [self.arrAtRisk objectAtIndex:indexPath.row];
    Story * firstStory = [atRisk.stories firstObject];
    cell.lblTitle.text = firstStory.title;
    UIImage * image = [UtilFunctions findCorrespondingImageViewFrom:firstStory.title];
    cell.lblName.text = atRisk.fakeName;
    cell.ivIcon.image = image;
    cell.lblAmount.text = [NSString stringWithFormat:@"$%@/$%@", firstStory.amountRaised, firstStory.amountNeeded];
    cell.lblDesc.text = firstStory.text;
    cell.progressView.progress = [firstStory.amountRaised floatValue]/[firstStory.amountNeeded floatValue];
    return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [self performSegueWithIdentifier:@"list_to_detail_segue" sender:indexPath];
}

- (IBAction)btnRefreshPressed:(id)sender {
    [[RKObjectManager sharedManager] getObjectsAtPath:@"/atRisk"
                                           parameters:nil
                                              success:^(RKObjectRequestOperation *operation, RKMappingResult *mappingResult) {
                                                  self.arrAtRisk = mappingResult.array;
//                                                  NSSortDescriptor* sortOrder = [NSSortDescriptor sortDescriptorWithKey: @"createDate" ascending:NO];
//                                                  self.arrAtRisk = [self.arrAtRisk sortedArrayUsingDescriptors: [NSArray arrayWithObject: sortOrder]];
//                                                  for (AtRisk *atrisk in self.arrAtRisk) {
//                                                      NSLog(@"%@", atrisk.createDate);
//                                                  }

                                                  [self.tableView reloadData];
                                              }
                                              failure:^(RKObjectRequestOperation *operation, NSError *error) {
                                                  NSLog(@"Downloading At Risk individuals failed': %@", error);
                                              }];
    [self.tableView reloadData];
}


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.identifier isEqualToString:@"list_to_detail_segue"]) {
        StoryDetailViewController * vc = [segue destinationViewController];
        NSIndexPath *indexPath = sender;
        vc.atRisk = [self.arrAtRisk objectAtIndex:indexPath.row];
    }
}


@end
